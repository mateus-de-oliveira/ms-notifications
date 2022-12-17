import { Content } from '@application/entities/content';

describe('Notification content', () => {
  it('should be able to create a notification content', () => {
    const content = new Content('Você recebeu uma solicitação de amizade');

    expect(content).toBeTruthy();
  });

  it('should not be able to create a notification content with less than 5 characters', () => {
    expect(() => new Content('opa')).toThrow();
  });

  it('should not be able to create a notification content more than 240 characters', () => {
    expect(() => new Content('M'.repeat(241))).toThrow();
  });
});
