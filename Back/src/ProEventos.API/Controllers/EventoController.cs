using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using ProEventos.API.Models;

namespace ProEventos.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
public class EventoController : ControllerBase
    {
        public IEnumerable<Evento> _evento = new Evento[] {
            new Evento() {
               Id = 1,
               Tema = "Angular 11 e .NET 5",
               Local = "São Paulo",
               Lote = "1º Lote",
               QtdPessoas = 200,
               DataEvento = DateTime.Now.AddDays(2),
               ImagemURL = "foto.png"
               },
                new Evento() {
               Id = 2,
               Tema = ".NET CORE 5",
               Local = "São Bernardo",
               Lote = "1º Lote",
               QtdPessoas = 300,
               DataEvento = DateTime.Now.AddDays(3),
               ImagemURL = "foto1.png"
               }
           }; 
      
        public EventoController()
        {
            
        }

        [HttpGet]
        public IEnumerable<Evento> Get()
        {
           return _evento;
        }

        [HttpGet("{id}")]
        public IEnumerable<Evento> GetById(int id)
        {
           return _evento.Where(Evento => Evento.Id == id);
        }

        [HttpPost]
        public string Post()
        {
           return "Exemplo POST";     
        }

        [HttpPut("{id}")]
        public string Put(int id)
        {
           return $"Exemplo PUT com id = {id}";     
        }

        [HttpDelete("{id}")]
        public string Delete(int id)
        {
           return $"Exemplo DELETE com id = {id}";     
        }
    }
}
