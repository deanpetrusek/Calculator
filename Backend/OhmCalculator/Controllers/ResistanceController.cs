using Core;
using System;
using System.Web.Http;

namespace OhmCalculator.Controllers
{
    [RoutePrefix("api/resistance")]
    public class ResistanceController : ApiController
    {
        private IOhmValueCalculator _calculator;
        private IColorBandsRepository _repository;

        public ResistanceController(IOhmValueCalculator calculator, IColorBandsRepository repository)
        {
            _calculator = calculator;
            _repository = repository;
        }

        [Route("{firstColor}/{secondColor}/{thirdColor}/{fourthColor}"), HttpGet()]
        public IHttpActionResult Calculate(string firstColor, string secondColor, string thirdColor, string fourthColor)
        {
            try
            {
                var first = _repository.GetByColor(firstColor);
                if (first == null)
                    return NotFound();

                var secondBand = _repository.GetByColor(secondColor);
                if (secondBand == null)
                    return NotFound();

                var thirdBand = _repository.GetByColor(thirdColor);
                if (thirdBand == null)
                    return NotFound();

                var fourthBand = _repository.GetByColor(fourthColor);

                return Ok(_calculator.CalculateOhmValue(first, secondBand, thirdBand, fourthBand));
            }
            catch(Exception ex)
            {
                return InternalServerError(ex);
            }            
        }
    }
}
