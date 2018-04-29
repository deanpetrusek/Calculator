using System.Collections.Generic;
using System.Linq;

namespace Core
{
    public class ColorBandsRepository : IColorBandsRepository
    {
        private List<ColorBand> _allBands;

        public ColorBandsRepository()
        {
            // these values could also come from a data layer, if they are likely to change
            _allBands = new List<ColorBand>
            {
                new ColorBand("Pink", significantFigures: null, multiplier: .001, tolerance: null),
                new ColorBand("Silver", significantFigures: null, multiplier: .01, tolerance: .1),
                new ColorBand("Gold", significantFigures: null, multiplier: .1, tolerance: .05),
                new ColorBand("Black", significantFigures: 0, multiplier: 1, tolerance: null),
                new ColorBand("Brown", significantFigures: 1, multiplier: 10, tolerance: .01),
                new ColorBand("Red", significantFigures: 2, multiplier: 100, tolerance: .02),
                new ColorBand("Orange", significantFigures: 3, multiplier: 1000, tolerance: null),
                new ColorBand("Yellow", significantFigures: 4, multiplier: 10000, tolerance: .05),
                new ColorBand("Green", significantFigures: 5, multiplier: 100000, tolerance: .05),
                new ColorBand("Blue", significantFigures: 6, multiplier: 1000000, tolerance: .025),
                new ColorBand("Violet", significantFigures: 7, multiplier: 10000000, tolerance: .01),
                new ColorBand("Gray", significantFigures: 8, multiplier: 100000000, tolerance: .05),
                new ColorBand("White", significantFigures: 9, multiplier: 1000000000, tolerance: null)
            };
        }

        public IEnumerable<ColorBand> GetAll()
        {
            return _allBands;
        }

        public ColorBand GetByColor(string color)
        {
            return _allBands.SingleOrDefault(band => band.Color.Equals(color, System.StringComparison.InvariantCultureIgnoreCase));
        }
        
    }
}
