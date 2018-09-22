using System;
using System.Collections.Generic;
using System.Data.Entity.Validation;
using System.Linq;
using System.Web;
using truckload.DbContext;

namespace truckload.Helpers
{
    public class ServerError
    {
        public static Error GetErrorFromException(Exception exception)
        {
            var message = "";
            var type = exception.GetType().ToString();

            if (exception.GetType().IsAssignableFrom(typeof(DbEntityValidationException)))
            {
                var dbe = (DbEntityValidationException)exception;
                foreach (var eve in dbe.EntityValidationErrors)
                {
                    message +=
                        $"Entity of type \"{eve.Entry.Entity.GetType().Name}\" in state \"{eve.Entry.State}\" has the following validation errors:" + Environment.NewLine;

                    foreach (var ve in eve.ValidationErrors)
                    {
                        message += $"- Property: \"{ve.PropertyName}\", Error: \"{ve.ErrorMessage}\"" + Environment.NewLine;
                    }
                }
            }
            else
            {
                var isInnerException = exception.InnerException != null;
                message += exception.Message;

                if (isInnerException)
                {
                    var innerEx = exception.GetOriginalException();
                    message = innerEx.Message;
                    type += Environment.NewLine + innerEx.GetType().ToString();
                }
            }

            return new Error()
            {
                ExceptionMsg = message,
                ExceptionType = type,
                ExceptionSource = exception.StackTrace,
                utcLogdate = DateTime.UtcNow,
            };
        }

        public static long LogException(Exception exception, string exeptionUrl, string globalId)
        {
            using (var db = new truckloadEntities())
            {
                var error = GetErrorFromException(exception);

                var newError = new Error()
                {
                    ExceptionMsg = error.ExceptionMsg,
                    ExceptionType = error.ExceptionType,
                    ExceptionURL = exeptionUrl,
                    ExceptionSource = exception.StackTrace,
                    utcLogdate = DateTime.UtcNow,
                    GlobalId = globalId.Split('\\').Last()
                };

                db.Errors.Add(newError);

                db.SaveChanges();

                return newError.ExceptionId;
            }
        }
    }
}