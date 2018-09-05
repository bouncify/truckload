using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(truckload.Startup))]
namespace truckload
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
