namespace AtelierLysBlanc.Api.Models;

public sealed record OrderResponse(string OrderId, decimal Total, DateOnly EstimatedDelivery);
