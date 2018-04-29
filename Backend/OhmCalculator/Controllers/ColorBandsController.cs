using Core;
using Newtonsoft.Json;
using System;
using System.Linq;
using System.Web.Http;

namespace OhmCalculator.Controllers
{
    [RoutePrefix("api/colorbands")]
    public class ColorBandsController : ApiController
    {
        private IColorBandsRepository _repository;

        public ColorBandsController(IColorBandsRepository repository)
        {
            _repository = repository;
        }

        [Route(""), HttpGet()]
        public IHttpActionResult Get()
        {
            try
            {
                var allBands = _repository.GetAll().ToList();
                var jsonResult = JsonConvert.SerializeObject(allBands);
                return Ok(jsonResult);
            }
            catch(Exception ex)
            {
                return InternalServerError(ex);
            }
        }
    }
}