using System.Text.Json.Serialization;

namespace AtelierLysBlanc.Api.Models;

public sealed class Product
{
    public int Id { get; init; }
    public required string Name { get; init; }
    public required string Slug { get; init; }
    public required string Style { get; init; }
    public decimal Price { get; init; }
    public required IReadOnlyList<string> Sizes { get; init; }
    public int Stock { get; init; }
    public bool Featured { get; init; }
    public required string Color { get; init; }
    public required string Image { get; init; }
    public required string Description { get; init; }

    [JsonIgnore]
    public ProductStyle StyleCode => Style switch
    {
        "Gala" => ProductStyle.Gala,
        "Eveniment" => ProductStyle.Eveniment,
        "Cocktail" => ProductStyle.Cocktail,
        "Mireasa civila" => ProductStyle.MireasaCivila,
        _ => ProductStyle.Eveniment
    };
}
