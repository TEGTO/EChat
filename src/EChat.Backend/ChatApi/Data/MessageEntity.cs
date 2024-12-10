using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ChatApi.Data
{
    public class MessageEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public string Id { get; set; } = default!;
        [Required]
        public string Name { get; set; } = default!;
        public string? Text { get; set; }
        [Required]
        public string UserId { get; set; } = default!;
        [Required]
        public DateTime CreatedAt { get; set; }
        [Required]
        public string Sentiment { get; set; } = default!;
    }
}
