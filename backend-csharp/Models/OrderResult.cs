namespace AtelierLysBlanc.Api.Models;

public sealed record OrderResult(bool Success, string? Error, OrderResponse? Order)
{
    public static OrderResult Failed(string error) => new(false, error, null);

    public static OrderResult Completed(OrderResponse order) => new(true, null, order);
}
