using AtelierLysBlanc.Api.Models;

namespace AtelierLysBlanc.Api.Services;

public sealed class OrderService(CatalogService catalog)
{
    public OrderResult Place(CheckoutRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.CustomerName) || request.CustomerName.Length < 3)
        {
            return OrderResult.Failed("Numele clientului este obligatoriu.");
        }

        if (string.IsNullOrWhiteSpace(request.Phone) || request.Phone.Length < 7)
        {
            return OrderResult.Failed("Telefonul nu este valid.");
        }

        if (string.IsNullOrWhiteSpace(request.Address) || request.Address.Length < 8)
        {
            return OrderResult.Failed("Adresa nu este valida.");
        }

        if (request.Items.Count == 0)
        {
            return OrderResult.Failed("Cosul este gol.");
        }

        var invalidLine = request.Items.FirstOrDefault(item =>
        {
            var product = catalog.FindById(item.ProductId);
            return product is null ||
                   item.Quantity <= 0 ||
                   item.Quantity > product.Stock ||
                   !product.Sizes.Contains(item.Size);
        });

        if (invalidLine is not null)
        {
            return OrderResult.Failed("Un produs din comanda nu este valid.");
        }

        var total = request.Items.Sum(item =>
        {
            var product = catalog.FindById(item.ProductId)!;
            return product.Price * item.Quantity;
        });

        var response = new OrderResponse(
            OrderId: $"LYS-{DateTimeOffset.UtcNow.ToUnixTimeMilliseconds():X}",
            Total: total,
            EstimatedDelivery: DateOnly.FromDateTime(DateTime.UtcNow.AddDays(3)));

        return OrderResult.Completed(response);
    }
}
