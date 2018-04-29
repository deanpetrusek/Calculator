using System;
using System.Text;
using Xunit;

namespace Core.Tests
{
    public class OhmValueCalculatorTests
    {
        private OhmValueCalculator _calculator;
        private ColorBandsRepository _repository;
        private Random _random;

        public OhmValueCalculatorTests()
        {
            _calculator = new OhmValueCalculator();
            _repository = new ColorBandsRepository();
            _random = new Random();
        }

        public string RandomString()
        {
            var characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            var builder = new StringBuilder();
            for(var i = 0; i < 10; i++)
            {
                var index = _random.Next() % characters.Length;
                builder.Append(characters[index]);
            }
            return builder.ToString();
        }

        public int RandomInt()
        {
            return _random.Next();
        }

        public int RandomInt(int min, int max)
        {
            return _random.Next(min, max);
        }

        public double RandomDouble()
        {
            return _random.NextDouble();
        }

        public ColorBand RandomColor()
        {
            return new ColorBand(RandomString(), RandomInt(), RandomDouble(), RandomDouble());
        }

        [Fact]
        public void WhenBandsAre_YellowVioletRedGold_OhmsValuesAre_Minimum4465_Maximum4935()
        {
            
            var firstBand = _repository.GetByColor("Yellow");
            var secondBand = _repository.GetByColor("Violet");
            var thirdBand = _repository.GetByColor("Red");
            var fourthBand = _repository.GetByColor("Gold");

            var result = _calculator.CalculateOhmValue(firstBand, secondBand, thirdBand, fourthBand);
            Assert.Equal(expected: 4935, actual: result.Maximum);
            Assert.Equal(expected: 4465, actual: result.Minimum);
        }

        [Fact]
        public void When_FirstBandDoesNotHaveSignificantDigit_ThrowsException()
        {
            var firstBand = new ColorBand(RandomString(), null, RandomDouble(), RandomDouble());
            Assert.Throws<ArgumentException>(() => { _calculator.CalculateOhmValue(firstBand, RandomColor(), RandomColor(), RandomColor()); });
        }

        [Fact]
        public void When_SecondBandDoesNotHaveSignificantDigit_ThrowsException()
        {
            var secondBand = new ColorBand(RandomString(), null, RandomDouble(), RandomDouble());
            Assert.Throws<ArgumentException>(() => { _calculator.CalculateOhmValue(RandomColor(), secondBand, RandomColor(), RandomColor()); });
        }

        [Fact]
        public void When_FirstParameterIsNull_ThrowsException()
        {
            Assert.Throws<ArgumentNullException>(() => { _calculator.CalculateOhmValue(null, RandomColor(), RandomColor(), RandomColor()); });
        }

        [Fact]
        public void When_SecondParameterIsNull_ThrowsException()
        {
            Assert.Throws<ArgumentNullException>(() => { _calculator.CalculateOhmValue(RandomColor(), null, RandomColor(), RandomColor()); });
        }

        [Fact]
        public void When_ThirdParameterIsNull_ThrowsException()
        {
            Assert.Throws<ArgumentNullException>(() => { _calculator.CalculateOhmValue(RandomColor(), RandomColor(), null, RandomColor()); });
        }

        [Fact]
        public void CalculateOhmValue_DoesProperlyCalculateOhmValue()
        {
            var firstSignificantDigit = RandomInt(0, 9);
            var secondSignificantDigit = RandomInt(0, 9);
            var multiplier = RandomInt();

            var firstBand = new ColorBand(RandomString(), firstSignificantDigit, RandomDouble(), null);
            var secondBand = new ColorBand(RandomString(), secondSignificantDigit, RandomDouble(), null);
            var thirdBand = new ColorBand(RandomString(), null, multiplier, null);
            var fourthBand = new ColorBand(RandomString(), null, RandomDouble(), RandomDouble());

            var significantDigits = Convert.ToInt32(string.Format("{0}{1}", firstSignificantDigit, secondSignificantDigit));
            var multiplied = significantDigits * (double)multiplier;
            var minimum = multiplied - multiplied * fourthBand.Tolerance.Value;
            var maximum = multiplied + multiplied * fourthBand.Tolerance.Value;
            var calculated = _calculator.CalculateOhmValue(firstBand, secondBand, thirdBand, fourthBand);

            Assert.Equal(minimum, calculated.Minimum);
            Assert.Equal(maximum, calculated.Maximum);
        }
    }
}
