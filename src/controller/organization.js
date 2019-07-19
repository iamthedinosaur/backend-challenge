import mongoose from 'mongoose';
import {Router} from 'express';
import Organization from '../model/organization';

export default({config, db}) => {
  let api = Router();

  //CRUD - Create Read Update Delete
  // 'v1/organization/add' - Create
  api.post('/add', (req, res) => {
    let newOrg = new Organization();
    newOrg.name = req.body.name;
    newOrg.addresses = req.body.addresses;

    newOrg.save(err =>{
      if(err){
        res.send(err);
      }
      res.json({message: 'Organization saved successfully'});
    });
  });

  // '/v1/organization' - Read
  api.get('/', (req, res) => {
    Organization.find({}, (err, organizations) => {
      if(err){
        res.send(err);
      }
      res.json(organizations);
    })
  })

  // '/v1/organization/:id' - Read 1
  api.get('/:id', (req, res) => {
    Organization.findById(req.params.id, (err, organization) => {
      if(err){
        res.send(err);
      }
      res.json(organization);
    });
  });

  // '/v1/organization/:id' - Update
  api.put('/:id', (req, res) => {
    Organization.findById(req.params.id, (err, organization) =>{
      if(err){
        res.send(err);
      }
      organization.name = req.body.name;
      organization.addresses = req.body.addresses;
      organization.save(err => {
        if(err){
          res.send(err);
        }
        res.json({message: "Organization info updated"});
      });
    });
  });

  // '/v1/organization/:id' - Delete
  api.delete('/:id', (req, res) => {
    Organization.remove({
      _id: req.params.id
    }, (err, organization) => {
      if(err){
        res.send(err);
      }
      res.json({message: "Organization successfully removed"});
    });
  });

  return api;
}
