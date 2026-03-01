import { workshopFromApi, workshopListFromApi, type WorkshopApiDto } from './workshop.mapper';

const API_DTO: WorkshopApiDto = {
  id: 1,
  name: 'Taller Central',
  address: 'Av. Corrientes 1234',
  email: 'taller@email.com',
  phone: '+54 11 9876-5432',
};

describe('WorkshopMapper', () => {
  describe('workshopFromApi', () => {
    it('should map API DTO to domain model', () => {
      const result = workshopFromApi(API_DTO);

      expect(result.id).toBe(1);
      expect(result.name).toBe('Taller Central');
      expect(result.address).toBe('Av. Corrientes 1234');
      expect(result.email).toBe('taller@email.com');
      expect(result.phone).toBe('+54 11 9876-5432');
    });
  });

  describe('workshopListFromApi', () => {
    it('should map an array of API DTOs', () => {
      const dto2: WorkshopApiDto = {
        id: 2,
        name: 'Taller Norte',
        address: 'Av. Libertador 5678',
        email: 'norte@email.com',
        phone: '+54 11 1111-2222',
      };

      const result = workshopListFromApi([API_DTO, dto2]);

      expect(result).toHaveLength(2);
      expect(result[0]?.name).toBe('Taller Central');
      expect(result[1]?.name).toBe('Taller Norte');
    });

    it('should return empty array for empty input', () => {
      const result = workshopListFromApi([]);
      expect(result).toHaveLength(0);
    });
  });
});
