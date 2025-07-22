-- Migration script to add phone field to existing database tables
-- Run this script on your existing database to add the phone column

-- Add phone column to guests table
ALTER TABLE guests ADD COLUMN phone TEXT;

-- Add phone column to updates table  
ALTER TABLE updates ADD COLUMN phone TEXT;
