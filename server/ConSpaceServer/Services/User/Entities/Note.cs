using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Components.Web;
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
    public string? Content { get; set; }

    [Column("title", TypeName="text")]
    [Required]
    public string Title { get; set; }

    [Column("deleted")]
    [Required]
    public bool deleted { get; set; } = false;

    [Column("created")]
    [Required]
    public DateTimeOffset created { get; set; }

    [Column("updated")]
    public DateTimeOffset? updated { get; set; }

    public Note(string title, string content)
    {
        Title = title;
        Content = content;
    }
}