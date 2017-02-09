'use strict';

import mongoose, {Schema} from 'mongoose';
import crypto from 'crypto';
import Request from '../request/request.model';

var UserSchema = new Schema({
  name: String,
  hashedPassword: { type: String, select: false },
  unconfirmed: { type: Boolean, default: true },
  provider: String,
  salt:  { type: String, select: false },
  role: { type: String, default: 'user' },
  email: { type: String, lowercase: true, unique: true, required: true },
  mdph: { type: Schema.Types.ObjectId, ref: 'Mdph' },
  newPasswordToken: { type: String, select: false },
  newMailToken: { type: String, select: false },
  secteurs: [{ type: Schema.Types.ObjectId, ref: 'Secteur' }],
});

/**
 * Virtuals
 */
UserSchema
  .virtual('password')
  .set(function(password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashedPassword = this.encryptPassword(password);
  })
  .get(function() {
    return this._password;
  });

// Public profile information
UserSchema
  .virtual('profile')
  .get(function() {
    if (this.role === 'adminMdph') {
      return {
        _id: this._id,
        name: this.name,
        role: this.role,
        email: this.email,
        mdph: this.mdph,
        unconfirmed: this.unconfirmed,
      };
    }

    return {
      _id: this._id,
      name: this.name,
      role: this.role,
      email: this.email,
      unconfirmed: this.unconfirmed,
    };
  });

// Non-sensitive info we'll be putting in the token
UserSchema
  .virtual('token')
  .get(function() {
    return {
      _id: this._id,
      role: this.role
    };
  });

/**
 * Validations
 */

// Validate empty email
UserSchema
  .path('email')
  .validate(function(email) {
    return email.length;
  }, 'Le mail ne peut pas être vide.');

// Validate empty password
UserSchema
  .path('hashedPassword')
  .validate(function(hashedPassword) {
    return hashedPassword.length;
  }, 'Le mot de passe ne peut pas être vide.');

// Validate email is not taken
UserSchema
  .path('email')
  .validate(function(value, respond) {
    var _this = this;
    this.constructor.findOne({email: value}, function(err, user) {
      if (err) throw err;
      if (user) {
        if (_this.id === user.id) return respond(true);
        return respond(false);
      }

      respond(true);
    });
  }, 'Cette adresse est déjà utilisée.');

var validatePresenceOf = function(value) {
  return value && value.length;
};

/**
 * Pre-save hook
 */
UserSchema
  .pre('save', function(next) {
    if (!this.isNew) return next();

    if (!validatePresenceOf(this.hashedPassword))
      next(new Error('Mot de passe incorrect'));
    else
      next();
  });

/**
 * Pre-delete hook
 */
UserSchema
  .pre('remove', function(next) {
    Request.remove({user: this}).exec();
    next();
  });

/**
 * Methods
 */
UserSchema.methods = {
  /**
   * Authenticate - check if the passwords are the same
   *
   * @param {String} plainText
   * @return {Boolean}
   * @api public
   */
  authenticate: function(plainText) {
    return this.encryptPassword(plainText) === this.hashedPassword;
  },

  /**
   * Make salt
   *
   * @return {String}
   * @api public
   */
  makeSalt: function() {
    return crypto.randomBytes(16).toString('base64');
  },

  /**
   * Encrypt password
   *
   * @param {String} password
   * @return {String}
   * @api public
   */
  encryptPassword: function(password) {
    if (!password || !this.salt) return '';
    var salt = new Buffer(this.salt, 'base64');
    return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
  }
};

export default mongoose.model('User', UserSchema);
