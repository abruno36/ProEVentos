using System;

namespace ProEventos.API.Models
{
    public class Evento
    {
        public int EventoId { get;  set; }
        public string Local { get;  set; }
        public string DataEvento { get;  set; }
        public string Tema { get;  set; }
        public int QtdPessoas { get;  set; }
        public string Lote { get; set; }
        public string ImagemURL { get;  set; }
        //public string Telefone { get; private set; }
        //public string Email { get; private set; }
        //public List<Lote> Lotes { get; set; }
        //public List<RedeSocial> RedesSociais { get; set; }
        //public List<PalestranteEvento> PalestrantesEventos { get; private set; }
    }
}