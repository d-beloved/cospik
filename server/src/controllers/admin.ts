import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Pool } from 'pg';
import createToken from '../utils/tokenize';
import { connectionString } from './../db/dbConfig';

const pool = new Pool(connectionString);

const secretKey = process.env.JWT_SECRET;

class adminController {

  static createAdmin(req, res) {
    
  }
}