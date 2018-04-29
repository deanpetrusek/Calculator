namespace Core
{
    public interface IOhmValueCalculator
    {
        Range CalculateOhmValue(ColorBand bandAColor, ColorBand bandBColor, ColorBand bandCColor, ColorBand bandDColor);
    }
}
