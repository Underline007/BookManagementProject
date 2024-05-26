using BookManagementReact.Data;
using BookManagementReact.Dtos;
using BookManagementReact.Models;
using System.Collections;

namespace BookManagementReact.Interfaces
{
    public interface IBookRepository
    {
        Task<IEnumerable<Book>> GetAllBooksAsync();
        Task<Book> GetBookByIdAsync(Guid id);
        Task AddBookAsync(Book book);
        Task UpdateBookAsync(Book book);
        Task DeleteBookAsync(Guid id);
    }
}
