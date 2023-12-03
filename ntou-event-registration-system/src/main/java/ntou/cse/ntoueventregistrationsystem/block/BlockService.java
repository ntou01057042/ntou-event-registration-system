package ntou.cse.ntoueventregistrationsystem.block;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BlockService {

    private final BlockRepository repository;

    @Autowired
    public BlockService(BlockRepository repository) {
        this.repository = repository;
    }

    public Boolean createBlock(Block block) {
        if (repository.existsByUserIdAndTargetId(block.getUserId(), block.getTargetId())) {
            return false;
        } else {
            repository.save(block);
            return true;
        }
    }
    public boolean existsByUserIdAndTargetId(String userId, String targetId) {
        return repository.existsByUserIdAndTargetId(userId, targetId);
    }

    public List<Block> getAllBlocks(String userId) {
        return repository.findAllByUserId(userId);
    }
    public void deleteBlock(String userId, String targetId) {
        repository.deleteByUserIdAndTargetId(userId,targetId);
    }
}
