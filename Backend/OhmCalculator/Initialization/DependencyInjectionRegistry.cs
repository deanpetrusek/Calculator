using Core;
using StructureMap;

namespace OhmCalculator.Initialization
{
    public class DependencyInjectionRegistry: Registry
    {
        public DependencyInjectionRegistry()
        {
            Scan(scanner =>
            {
                scanner.TheCallingAssembly();
                scanner.AssemblyContainingType<IOhmValueCalculator>();
                scanner.WithDefaultConventions();
            });
        }
    }
}