using Microsoft.AspNetCore.Mvc;

namespace Goods.BackOffice.Controllers;

public class AppController : Controller
{
	public IActionResult App()
	{
		return View("App");
	}
}
