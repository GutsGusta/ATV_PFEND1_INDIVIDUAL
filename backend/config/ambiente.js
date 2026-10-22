const nomesObrigatorios = ['PORT', 'DB_HOST', 'DB_PORT', 'DB_USER', 'DB_NAME'];

export function carregarAmbiente(arquivoDeConfiguracao) {
    if (arquivoDeConfiguracao) {
        try {
            process.loadEnvFile(arquivoDeConfiguracao);
        } catch {
            throw new Error(`Arquivo de configuração não encontrado: ${arquivoDeConfiguracao}`);
        }
    }

    const ausentes = nomesObrigatorios.filter((nome) => {
        const valor = process.env[nome];
        return typeof valor !== 'string' || valor.trim() === '';
    });

    if (ausentes.length > 0) {
        throw new Error(`Configure no .env: ${ausentes.join(', ')}`);
    }

    return {
        porta: process.env.PORT,
        ambiente: process.env.NODE_ENV || 'development'
    };
}
