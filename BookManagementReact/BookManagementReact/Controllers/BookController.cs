using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using BookManagementReact.Dtos;
using BookManagementReact.Interfaces;
using BookManagementReact.Models;
using Microsoft.AspNetCore.Authorization;

[ApiController]
[Route("api/books")]
[Authorize]
public class BooksController : ControllerBase
{
    private readonly IBookRepository _bookRepository;

    public BooksController(IBookRepository bookRepository)
    {
        _bookRepository = bookRepository;
    }

    [HttpGet]
    public async Task<IActionResult> GetBooks()
    {
        var books = await _bookRepository.GetAllBooksAsync();
        return Ok(books);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetBook(Guid id)
    {
        var book = await _bookRepository.GetBookByIdAsync(id);
        if (book == null)
        {
            return NotFound();
        }
        return Ok(book);
    }

    [HttpPost]
    public async Task<IActionResult> CreateBook([FromBody] BookDto bookDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var book = new Book
        {
            Name = bookDto.Name,
            Description = bookDto.Description,  
            ReleaseDate = bookDto.ReleaseDate
        };

        await _bookRepository.AddBookAsync(book);
        return CreatedAtAction(nameof(GetBook), new { id = book.Id }, book);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateBook(Guid id, [FromBody] BookDto bookDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var book = await _bookRepository.GetBookByIdAsync(id);
        if (book == null)
        {
            return NotFound();
        }

        book.Name = bookDto.Name;
        book.Description = bookDto.Description;  
        book.ReleaseDate = bookDto.ReleaseDate;

        await _bookRepository.UpdateBookAsync(book);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteBook(Guid id)
    {
        await _bookRepository.DeleteBookAsync(id);
        return NoContent();
    }
}
