using System;

namespace Core
{
    public class ColorBand
    {
        public ColorBand(string color, int? significantFigures, double multiplier, double? tolerance)
        {
            if (string.IsNullOrWhiteSpace(color))
                throw new ArgumentNullException("color");

            SignificantFigures = significantFigures;
            Multiplier = multiplier;
            Tolerance = tolerance;
            Color = color;
            Id = Guid.NewGuid();
        }

        public Guid Id { get; set; }
        public string Color { get; set; }
        public int? SignificantFigures { get; set; }
        public double Multiplier { get; set; }
        public double? Tolerance { get; set; }
    }
}
