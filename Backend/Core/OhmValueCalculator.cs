using System;
using System.Linq;

namespace Core
{
    public class Range
    {
        public double Minimum { get; set; }
        public double Maximum { get; set; }
    }

    public class OhmValueCalculator : IOhmValueCalculator
    {
        // Changed the return type to double to support the highest possible value of 99,000,000,000 (without considering tolerance)
        public Range CalculateOhmValue(ColorBand bandAColor, ColorBand bandBColor, ColorBand bandCColor, ColorBand bandDColor)
        {
            if (bandAColor == null)
                throw new ArgumentNullException(nameof(bandAColor));

            if (bandBColor == null)
                throw new ArgumentNullException(nameof(bandBColor));

            if (bandCColor == null)
                throw new ArgumentNullException(nameof(bandCColor));

            var significantFigureValue = CalculateValueOfSignificantFigures(bandAColor, bandBColor);
            var multipliedValue = CalculateMultipliedValue(significantFigureValue, bandCColor);
            return CalculateTolerantRange(multipliedValue, bandDColor);
        }

        private static Range CalculateTolerantRange(double value, ColorBand fourthBand)
        {
            if (fourthBand.Tolerance == null)
                throw new ArgumentNullException("fourthBand");
            var range = new Range();
            var toleranceIncrement = value * fourthBand.Tolerance.Value;
            range.Minimum = value - toleranceIncrement;
            range.Maximum = value + toleranceIncrement;
            return range;
        }

        private static double CalculateValueOfSignificantFigures(ColorBand firstBand, ColorBand secondBand)
        {
            if(firstBand.SignificantFigures == null)
                throw new ArgumentException($"Color bands with null significant figures cannot be used for significant figures calculation. Color band used: \"{firstBand.Color}\"");

            if (secondBand.SignificantFigures == null)
                throw new ArgumentException($"Color bands with null significant figures cannot be used for significant figures calculation. Color band used: \"{secondBand.Color}\"");

            return firstBand.SignificantFigures.Value * 10 + secondBand.SignificantFigures.Value;
        }

        private static double CalculateMultipliedValue(double currentValue, ColorBand multiplierBand)
        {
            return currentValue * multiplierBand.Multiplier;
        }
    }
}
