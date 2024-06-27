using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<AppDataContext>();
builder.Services.AddCors(
    options => options.AddPolicy("Acesso Total", configs => configs.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod().WithExposedHeaders().WithOrigins().WithMethods())
);

var app = builder.Build();


app.MapGet("/", () => "Prova A1");

//ENDPOINTS DE CATEGORIA
//GET: http://localhost:5273/categoria/listar
app.MapGet("/categoria/listar", ([FromServices] AppDataContext ctx) =>
{
    if (ctx.Categorias.Any())
    {
        return Results.Ok(ctx.Categorias.ToList());
    }
    return Results.NotFound("Nenhuma categoria encontrada");
});

//POST: http://localhost:5273/categoria/cadastrar
app.MapPost("/categoria/cadastrar", ([FromServices] AppDataContext ctx, [FromBody] Categoria categoria) =>
{
    ctx.Categorias.Add(categoria);
    ctx.SaveChanges();
    return Results.Created("", categoria);
});

//ENDPOINTS DE TAREFA
//GET: http://localhost:5273/tarefas/listar
app.MapGet("/tarefas/listar", ([FromServices] AppDataContext ctx) =>
{
    if (ctx.Tarefas.Any())
    {
        return Results.Ok(ctx.Tarefas.ToList());
    }
    return Results.NotFound("Nenhuma tarefa encontrada");
});

//POST: http://localhost:5273/tarefas/cadastrar
app.MapPost("/tarefas/cadastrar", ([FromServices] AppDataContext ctx, [FromBody] Tarefa tarefa) =>
{
    Categoria? categoria = ctx.Categorias.Find(tarefa.CategoriaId);
    if (categoria == null)
    {
        return Results.NotFound("Categoria não encontrada");
    }
    tarefa.Categoria = categoria;
    ctx.Tarefas.Add(tarefa);
    ctx.SaveChanges();
    return Results.Created("", tarefa);
});

//PUT: http://localhost:5273/tarefas/alterar/{id}
app.MapPatch("/tarefas/alterar/{id}", ([FromServices] AppDataContext ctx, [FromRoute] string id ) =>
{
    Tarefa? tarefa = ctx.Tarefas.FirstOrDefault(e => e.TarefaId == id);

    if (tarefa.Status.Equals("Não iniciada"))
    {
        tarefa.Status = "Em andamento";
        ctx.SaveChanges();
        return Results.Ok(tarefa);
    }
    if (tarefa.Status.Equals("Em andamento"))
    {
        tarefa.Status = "Concluído";
        ctx.SaveChanges();
        return Results.Ok(tarefa);
    }
    return Results.BadRequest("Status inválido!!");
});

//GET: http://localhost:5273/tarefas/naoconcluidas
app.MapGet("/tarefas/naoconcluidas", ([FromServices] AppDataContext ctx) =>
{
    var tarefas = ctx.Tarefas.Where(e => e.Status.Equals("Não iniciada")).ToList();

    if (tarefas.Any())
    {
        return Results.Ok(tarefas);
    }
    return Results.BadRequest("Não existem tarefas não concluidas!");

});

//GET: http://localhost:5273/tarefas/concluidas
app.MapGet("/tarefas/concluidas", ([FromServices] AppDataContext ctx) =>
{
    var tarefas = ctx.Tarefas.Where(e => e.Status.Equals("Concluído")).ToList();

    if (tarefas.Any())
    {
        return Results.Ok(tarefas);

    }
    return Results.BadRequest("Não existem tarefas concluídas");
});

app.UseCors("Acesso Total");
app.Run();
