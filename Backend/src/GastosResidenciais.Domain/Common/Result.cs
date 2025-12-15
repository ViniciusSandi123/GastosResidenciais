using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GastosResidenciais.Domain.Common
{
    public class Result
    {
        public bool Success { get; }
        public string? Error { get; }

        protected Result(bool success, string? error)
        {
            Success = success;
            Error = error;
        }

        public static Result Ok() => new Result(true, null);
        public static Result Fail(string error) => new Result(false, error);
    }
}
