using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using University_Admission.Data;
using University_Admission.Domain.Entities.CommonEntities;
using University_Admission.ViewModel;

namespace University_Admission.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CommonController : ControllerBase
    {
        private readonly ApplicationDbContext _db;
        private readonly IMapper _mapper;

        public CommonController(ApplicationDbContext db, IMapper mapper)
        {
            _db = db;
            _mapper = mapper;
        }

        [HttpGet("GetAllCountries")]
        public async Task<ActionResult<Response<List<CountryViewModel>>>> GetAllCountries()
        {
            try
            {
                var country = await _db.Countries.ToListAsync();
                if (country == null)
                {
                    return Response<List<CountryViewModel>>.FailureResponse("No countries exist");
                }
                return Response<List<CountryViewModel>>.SuccessResponse(
                    _mapper.Map<List<CountryViewModel>>(country)
                );
            }
            catch (Exception ex)
            {
                return Response<List<CountryViewModel>>.FailureResponse(ex);
            }
        }
    }
}
