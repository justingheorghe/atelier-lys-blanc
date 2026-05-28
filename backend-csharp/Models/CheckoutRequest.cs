namespace AtelierLysBlanc.Api.Models;

public sealed record CheckoutRequest(
    string CustomerName,
    string Phone,
    string Address,
    string? Notes,
    PaymentMethod PaymentMethod,
    IReadOnlyList<OrderLineRequest> Items);
