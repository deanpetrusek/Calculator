## Calculator
This solution is broken into two applications, a frontend SPA built with ReactJS and a backend API built with WebAPI in C#.

**Running the back end service**
To run the backend application, open the file https://github.com/deanpetrusek/Calculator/blob/master/Backend/OhmCalculator.sln in visual studio. Right-click on the solution and select `Restore NuGet Packages`. Then, right click on the `Api` project and select `Set as StartUp Project`. Click `Run`

To enable proper communication between the front end application and the backend service, the root url must be correctly set here: https://github.com/deanpetrusek/Calculator/blob/master/UI/src/Repositories/Urls.js
The expected location of the backend url is `http://localhost:54654`

**Running the front end application**
To run the frontend application, open a `cmd` prompt and navigate to `{source}\Calculator\UI`. Execute the command `npm install` to install the node dependency packages. Then execute `npm start`.


## Changes to the interface implementation
**Original implementation**


    public interface IOhmValueCalculator
    {
       /// <summary>
       /// Calculates the Ohm value of a resistor based on the band colors.
       /// </summary>
       /// <param name="bandAColor">The color of the first figure of component value band.</param>
       /// <param name="bandBColor">The color of the second significant figure band.</param>
       /// <param name="bandCColor">The color of the decimal multiplier band.</param>
       /// <param name="bandDColor">The color of the tolerance value band.</param>
       int CalculateOhmValue(string bandAColor, string bandBColor, string bandCColor, string bandDColor);
    }

**Changes**
modified the return type to be a Range, since the tolerance band defines a minimum and maximum ohm value. I made the minimum and maximum values double, instead of int, since the maximum possible value is more than the int maximum of `2,147,483,647`

modified the parameters of the method to be types of https://github.com/deanpetrusek/Calculator/blob/master/Backend/Core/ColorBand.cs . I made this modification to create a domain entity type which could be hydrated from a SQL database or other backend data store (in this implementation, I have just created the instances of the domain entities in code). This also allows the OhmValueCalculator to only be responsible for computing the resistance range of the inputs and not how those inputs are represented in the rest of the code. An added benefit is that the inputs can be properly randomized for testing.