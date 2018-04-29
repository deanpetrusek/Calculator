using System.Collections.Generic;

namespace Core
{
    public interface IColorBandsRepository
    {
        IEnumerable<ColorBand> GetAll();
        ColorBand GetByColor(string color);
    }
}