using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using University_Admission.Domain.Entities.UserEntities;
using University_Admission.Domain.Enum;

namespace University_Admission.Domain.Entities.BaseEntities
{
    public class ActionableEntity : DatedEntity
    {
        public ActionStatus? Status { get; private set; }
        public int? ActionUserId { get; private set; }

        [ForeignKey("ActionUserId")]
        public virtual User? ActionUser { get; private set; }

        [StringLength(500)]
        public string? Remarks { get; private set; }

        public void Submit(int? userId = null)
        {
            Status = ActionStatus.Submitted;
            ActionUserId = userId;
        }

        public void Approve(int userId, string? remarks)
        {
            Status = ActionStatus.Approved;
            ActionUserId = userId;
            Remarks = remarks;
        }

        public void Reject(int userId, string? remarks)
        {
            Status = ActionStatus.Rejected;
            ActionUserId = userId;
            Remarks = remarks;
        }
    }
}
