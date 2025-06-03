using System.ComponentModel.DataAnnotations;

namespace University_Admission.DTO
{
    public class AnnouncementDto
    {
        [Required]
        public string Title { get; set; }
        public string Description { get; set; }

        public AnnouncementDto(string title, string description)
        {
            Title = title;
            Description = description;
        }
    }
}
