using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace User.Entities;

[Table("notes")]
public class Note
{
    [Column("id")]
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public Guid id { get; set; }

    // public string userId { get; set; }
    [Column("content", TypeName="text")]
    public string? content { get; set; }

    [Column("title", TypeName="text")]
    [Required]
    public string title { get; set; }

    [Column("deleted")]
    [Required]
    public bool deleted { get; set; } = false;
}