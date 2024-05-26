using System.ComponentModel.DataAnnotations;

namespace BookManagementReact.Dtos
{
    public class BookDto
    {

        [Required]
        [MaxLength(30, ErrorMessage ="Max length of name is 30 characters")]
        public string Name { get; set; } = string.Empty;
        [Required]
        [MaxLength(50, ErrorMessage = "Max length of description is 50 characters")]
        public string Description { get; set; } = string.Empty;
        public DateTime ReleaseDate { get; set; }
    }
}
