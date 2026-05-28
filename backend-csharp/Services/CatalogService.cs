using System.Text.Json;
using AtelierLysBlanc.Api.Models;

namespace AtelierLysBlanc.Api.Services;

public sealed class CatalogService
{
    private readonly IReadOnlyList<Product> _products;

    public CatalogService(IWebHostEnvironment environment)
    {
        var path = Path.Combine(environment.ContentRootPath, "Data", "products.json");
        var json = File.ReadAllText(path);
        _products = JsonSerializer.Deserialize<IReadOnlyList<Product>>(json, new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true
        }) ?? [];
    }

    public IReadOnlyList<Product> GetAll() => _products;

    public Product? FindById(int id) => _products.FirstOrDefault(product => product.Id == id);

    public IReadOnlyList<Product> FilterByStyle(string style)
    {
        return _products
            .Where(product => string.Equals(product.Style, style, StringComparison.OrdinalIgnoreCase))
            .OrderBy(product => product.Price)
            .ToList();
    }
}
