using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class Seed
    {
        public static async Task SeedUsers(DataContext context)
        {
            if (await context.User.AnyAsync()) return;
            var userData = await File.ReadAllTextAsync("API/Data/UserSeedData.json");
            var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };
            var users = JsonSerializer.Deserialize<List<AppUser>>(userData);
            foreach (var user1 in users)
            {
                using var hmac = new HMACSHA512();
                user1.UserName = user1.UserName.ToLower();
                user1.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes("Pa$$w0rd"));
                user1.PasswordSalt = hmac.Key;
                context.User.Add(user1);
            }
            await context.SaveChangesAsync();
        }
    }
}