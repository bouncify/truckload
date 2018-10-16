using Microsoft.Owin;
using Owin;

[assembly: OwinStartup(typeof(truckload.Startup))]
namespace truckload
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
            app.MapSignalR();
        }
    }
}
