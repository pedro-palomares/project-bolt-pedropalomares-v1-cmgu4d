import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { Loader2, Wand2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { generatePostSchema, type GeneratePostForm } from '../../../lib/api/blog';
import { blogApi } from '../../../lib/api/blog';

const GeneratePost = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<GeneratePostForm>({
    resolver: zodResolver(generatePostSchema)
  });

  const { mutate: generatePost, isLoading } = useMutation({
    mutationFn: blogApi.generatePost,
    onSuccess: () => {
      toast.success('Artículo generado correctamente');
      reset();
    },
    onError: () => {
      toast.error('Error al generar el artículo');
    }
  });

  return (
    <div className="bg-dark-lighter rounded-lg p-6 border border-gray-800">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <Wand2 className="w-5 h-5 mr-2 text-primary" />
        Generar Artículo con IA
      </h2>
      
      <form onSubmit={handleSubmit((data) => generatePost(data))} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Tema del Artículo
          </label>
          <input
            {...register('topic')}
            className="w-full px-4 py-2 bg-dark border border-gray-700 rounded-md focus:ring-primary focus:border-primary text-white"
            placeholder="Ej: Cómo la IA está transformando las ventas en 2024"
          />
          {errors.topic && (
            <p className="mt-1 text-sm text-red-500">{errors.topic.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Categoría
          </label>
          <select
            {...register('category')}
            className="w-full px-4 py-2 bg-dark border border-gray-700 rounded-md focus:ring-primary focus:border-primary text-white"
          >
            <option value="">Selecciona una categoría</option>
            <option value="Inteligencia Artificial">Inteligencia Artificial</option>
            <option value="Automatización">Automatización</option>
            <option value="Ventas">Ventas</option>
            <option value="Marketing Digital">Marketing Digital</option>
          </select>
          {errors.category && (
            <p className="mt-1 text-sm text-red-500">{errors.category.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Tags (separados por coma)
          </label>
          <input
            {...register('tags')}
            className="w-full px-4 py-2 bg-dark border border-gray-700 rounded-md focus:ring-primary focus:border-primary text-white"
            placeholder="IA, Ventas, Tecnología"
          />
          {errors.tags && (
            <p className="mt-1 text-sm text-red-500">{errors.tags.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="flex items-center justify-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-light transition-colors disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Generando...
            </>
          ) : (
            <>
              <Wand2 className="w-4 h-4 mr-2" />
              Generar Artículo
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default GeneratePost;