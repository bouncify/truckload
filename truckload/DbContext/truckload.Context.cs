﻿//------------------------------------------------------------------------------
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
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class truckloadEntities : DbContext
    {
        public truckloadEntities()
            : base("name=truckloadEntities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<AspNetUser> AspNetUsers { get; set; }
        public virtual DbSet<Driver> Drivers { get; set; }
        public virtual DbSet<ErrorLog> ErrorLogs { get; set; }
        public virtual DbSet<Load> Loads { get; set; }
        public virtual DbSet<LoadStatu> LoadStatus { get; set; }
        public virtual DbSet<Order> Orders { get; set; }
        public virtual DbSet<ProvinceOrState> ProvinceOrStates { get; set; }
        public virtual DbSet<Region> Regions { get; set; }
        public virtual DbSet<Trailer> Trailers { get; set; }
        public virtual DbSet<TrailerType> TrailerTypes { get; set; }
        public virtual DbSet<Truck> Trucks { get; set; }
        public virtual DbSet<UnitOfMeasure> UnitOfMeasures { get; set; }
        public virtual DbSet<Warehouse> Warehouses { get; set; }
    }
}
