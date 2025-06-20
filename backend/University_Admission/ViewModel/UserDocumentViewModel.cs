﻿using AutoMapper;
using University_Admission.Domain.Entities.UserEntities;

namespace University_Admission.ViewModel
{
    public class UserDocumentViewModel
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string FullName { get; set; }
        public int DocumentId { get; set; }
        public string? DocumentName { get; set; }
        public string Value { get; set; }

        public UserDocumentViewModel()
        {
            FullName = string.Empty;
            Value = string.Empty;
        }

        class Mapping : Profile
        {
            public Mapping()
            {
                CreateMap<UserDocument, UserDocumentViewModel>()
                    .ForMember(dst => dst.FullName, opt => opt.MapFrom(src => src.User.FullName))
                    .ForMember(
                        dst => dst.DocumentName,
                        opt => opt.MapFrom(src => src.Document.Name)
                    );
            }
        }
    }
}
