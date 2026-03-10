using Microsoft.AspNetCore.Mvc;

namespace Goods.BackOffice.Controllers.Infrastructure;

public class HomeController : AppController
{
	[Route("/"), Route("/products"), Route("/drivers"), Route("/vehicles")]

    public IActionResult Index() => App();
}
