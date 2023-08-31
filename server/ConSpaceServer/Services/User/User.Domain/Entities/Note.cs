#region

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

#endregion

namespace User.Domain.Entities;

[Table("notes")]
public class Note
{
    public Note()
    {
    }

    public Note(string title, string content, Guid userId)
    {
        Title = title;
        Content = content;
        UserId = userId;
    }

    [Column("id")]
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public Guid Id { get; set; }

    [Column("user_id")] public Guid UserId { get; set; }

    public Attendee User { get; set; }

    [Column("content", TypeName = "text")] public string? Content { get; set; }

    [Column("title", TypeName = "text")]
    [Required]
    public string Title { get; set; }

    [Column("deleted")] [Required] public bool Deleted { get; set; }

    [Column("created")] [Required] public DateTimeOffset Created { get; set; }

    [Column("updated")] public DateTimeOffset? Updated { get; set; }
}