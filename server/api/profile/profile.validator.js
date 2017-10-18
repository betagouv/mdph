'use strict';

import compose from 'composable-middleware';
import Joi from 'joi';

import User from '../user/user.model';

const beneficiaireSchema = Joi.object().keys({
  localite: Joi.string().required(),
  code_postal: Joi.string().required(),
  nomVoie: Joi.string().required(),
  dateNaissance: Joi.date().required(),
  nationalite: Joi.string().required(),
  sexe: Joi.string().required(),
  prenom: Joi.string().required(),
  nom: Joi.string().required(),
  email: Joi.string().required(),
  numero_secu: Joi.string().required(),
  assurance: Joi.string().required()
});

export function check() {
  return compose()
    .use(function(req, res, next) {

      User
      .findById(req.profile.user)
      .populate('mdph')
      .exec(function(err, user) {
        if (err) {
          return next(err);
        }

        if (user.mdph && !user.mdph.opened) {
          return res.status(406).json('MDPH fermé');
        }

        next();
      });

    })
    .use(function(req, res, next) {

      if(req.body.identites.beneficiaire) {
        Joi.validate(req.body.identites.beneficiaire, beneficiaireSchema, {allowUnknown: true}, (err) => {
          if(err !== null) {
            var error = err.details.reduce(function(prev, curr) {
              return [...prev, curr.message];
            }, []);
            res.status(406).json(error);
          } else {
            next();
          }
        });
      } else {
        next();
      }
    });
}
