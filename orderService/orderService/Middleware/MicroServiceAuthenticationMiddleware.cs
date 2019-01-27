using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using orderService.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;

namespace orderService.Middleware
{
    public class MicroServiceAuthenticationMiddleware
    {
        private readonly RequestDelegate _nextMiddleWare;
        private const string cnst_xaccesstoken = "x-access-token";
        private const string cnst_userKey= "authUser";
        private IConfiguration _configuration = null;

        

        public MicroServiceAuthenticationMiddleware(RequestDelegate next,IConfiguration configuration)
        {
            _nextMiddleWare = next;
            _configuration = configuration;
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                var request = context.Request;
                var tokenHeader = request.Headers[cnst_xaccesstoken];
                if (tokenHeader.Count > 0)
                {
                    var token = tokenHeader[0];
                    var authenticationServerUri = _configuration["AuthenticationServerURI"];
                    var client = new HttpClient();
                    var httpRequestMessage = new HttpRequestMessage
                    {
                        Method = HttpMethod.Post,
                        RequestUri = new Uri(authenticationServerUri),
                        Headers = {
                        { cnst_xaccesstoken, token }
                    }
                    };


                    using (HttpResponseMessage res = await client.SendAsync(httpRequestMessage))
                    using (HttpContent content = res.Content)
                    {
                        string data = await content.ReadAsStringAsync();
                        if (data != null)
                        {
                            Console.WriteLine(data);
                            User user = JsonConvert.DeserializeObject<User>(data);
                            if (user.phone.Length > 0)
                            {
                                context.Items[cnst_userKey] = user;
                                await _nextMiddleWare(context);
                                return;
                            }


                        }
                    }
                    await HandleExceptionAsync(context, new Exception("Token is not Validated!"));
                }
                else
                {
                    await HandleExceptionAsync(context, new Exception("Token is not Provided!"));
                }
                
            }
            catch (Exception)
            {

                await HandleExceptionAsync(context, new Exception("An error occured when token had validating!"));
            }
            //context.Response.WriteAsync()

        }

        private static Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            var code = HttpStatusCode.Unauthorized;
           
            var result = JsonConvert.SerializeObject(new { error = exception.Message });
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)code;
            return context.Response.WriteAsync(result);
        }
    }
}
