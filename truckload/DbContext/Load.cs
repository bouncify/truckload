//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace truckload.DbContext
{
    using System;
    using System.Collections.Generic;
    
    public partial class Load
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Load()
        {
            this.Orders = new HashSet<Order>();
        }
    
        public long LoadId { get; set; }
        public int RegionId { get; set; }
        public System.DateTime LoadDate { get; set; }
        public Nullable<int> UnitOfMeasureId { get; set; }
        public Nullable<int> TruckId { get; set; }
        public Nullable<int> TrailerId { get; set; }
        public Nullable<int> DriverId { get; set; }
        public int CurrentLoadWeightKg { get; set; }
        public int LoadStatusId { get; set; }
        public Nullable<int> PostalCodeGroupId { get; set; }
        public string CreatedByGlobalId { get; set; }
        public System.DateTime CreatedDate { get; set; }
        public string ModifiedByGlobalId { get; set; }
        public Nullable<System.DateTime> ModifiedDate { get; set; }
    
        public virtual Driver Driver { get; set; }
        public virtual LoadStatu LoadStatu { get; set; }
        public virtual Region Region { get; set; }
        public virtual Trailer Trailer { get; set; }
        public virtual Truck Truck { get; set; }
        public virtual UnitOfMeasure UnitOfMeasure { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Order> Orders { get; set; }
    }
}
