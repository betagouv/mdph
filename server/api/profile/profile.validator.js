'use strict';

import compose from 'composable-middleware';
import Joi from 'joi';


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
