using System.ComponentModel.DataAnnotations;

namespace BookManagementReact.Models
{
    public class Book
    {
        [Required]
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;    
        public string Description { get; set; } = string.Empty;
        public DateTime ReleaseDate { get; set; }
    }
}
