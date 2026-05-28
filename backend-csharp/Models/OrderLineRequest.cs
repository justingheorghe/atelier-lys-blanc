namespace AtelierLysBlanc.Api.Models;

public sealed record OrderLineRequest(int ProductId, string Size, int Quantity);
